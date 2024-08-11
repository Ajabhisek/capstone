import os
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_community.vectorstores import FAISS
from services.PDFReader import PDFReaderService

google_api_key = os.getenv("GOOGLE_API_KEY")


class VectorStoreService:
    def __init__(self, file_path):
        self.file_path = file_path

    def save_vector(self):
        pdf_helper = PDFReaderService(self.file_path)
        embeddings = GoogleGenerativeAIEmbeddings(api_key=google_api_key, model="models/embedding-001")
        vector_store = FAISS.from_texts(pdf_helper.get_text_chunks(), embedding=embeddings)
        vector_store.save_local(f"faiss_index/{self.file_path}")
