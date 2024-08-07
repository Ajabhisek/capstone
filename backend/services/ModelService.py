import math

from PyPDF2 import PdfReader
from langchain.text_splitter import RecursiveCharacterTextSplitter
import os
from langchain_google_genai import GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI
import google.generativeai as genai
from langchain_community.vectorstores import FAISS
from langchain.chains.question_answering import load_qa_chain
from langchain.prompts import PromptTemplate
from dotenv import load_dotenv

load_dotenv()
google_api_key = os.getenv("GOOGLE_API_KEY")


class GeminiChat:
    def __init__(self, question, file_path):
        self.question = question
        self.file_path = file_path
        genai.configure(api_key=google_api_key)

    def get_conversational_chain(self):
        prompt_template = """
        Answer the question as detailed as possible from the provided context, make sure to provide all the details, if the answer is not in
        provided context just say, "answer is not available in the context", don't provide the wrong answer\n\n
        Context:\n {context}\n
        Question: \n{question}\n

        Answer:
        """

        model = ChatGoogleGenerativeAI(model="gemini-pro", temperature=0.3)
        prompt = PromptTemplate(template=prompt_template, input_variables=["context", "question"])
        return load_qa_chain(model, chain_type="stuff", prompt=prompt)

    def get_answer(self):
        embeddings = GoogleGenerativeAIEmbeddings(api_key=google_api_key, model="models/embedding-001")
        new_db = FAISS.load_local(f"faiss_index/{self.file_path}", embeddings, allow_dangerous_deserialization=True)

        docs = new_db.similarity_search_with_score(self.question)

        if docs:
            most_relevant_doc, score = docs[0]
            chain = self.get_conversational_chain()
            response = chain({"input_documents": [most_relevant_doc], "question": self.question},
                             return_only_outputs=True)
            if "Answer is not available" in response["output_text"]:
                return {"answer": response["output_text"], "score": 0.00,"context":most_relevant_doc.page_content}
            return {"answer": response["output_text"], "score": math.ceil((1 - score) * 100) / 100,"context":most_relevant_doc.page_content}
        else:
            return {"message": "No context found", "score": 0.00,"context":""}
