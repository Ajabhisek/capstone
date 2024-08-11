import functools
from PyPDF2 import PdfReader
from langchain.text_splitter import RecursiveCharacterTextSplitter


class PDFReaderService:
    def __init__(self, file_path):
        self.file_path = file_path
        self.text = self.extract_pdf_text()

    def extract_pdf_text(self):
        pdf_content = ""
        pdf_file = PdfReader(f"files/{self.file_path}")
        for page in pdf_file.pages:
            pdf_content += page.extract_text() or ""
        return pdf_content

    def get_text_chunks(self):
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000,chunk_overlap=100)
        return text_splitter.split_text(self.text)