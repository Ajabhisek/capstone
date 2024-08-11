import pdfplumber
import re

WORD_SPLIT_COUNT = 500
WORD_OFFSET_VALUE = 50


class PDFHelper:
    def __init__(self, file_name, number_to_split=WORD_SPLIT_COUNT, word_offset_value=WORD_OFFSET_VALUE):
        self.file_name = file_name
        self.number_to_split = number_to_split
        self.word_offset_value = word_offset_value

    def extract_context(self):
        contexts = []
        remainder_string = ""

        with pdfplumber.open(f"files/{self.file_name}") as pdf:
            for page in pdf.pages:
                string_from_single_page = re.sub(r'\s+', ' ', page.extract_text())
                total_string = remainder_string + string_from_single_page
                string_array = total_string.split(" ")
                array_len = len(string_array)
                split_number = array_len if array_len < self.number_to_split else self.number_to_split
                contexts.append([" ".join(string_array[:split_number])])
                remainder_offset = split_number - self.word_offset_value
                remainder_string = "" if remainder_offset < 1 else " ".join(string_array[remainder_offset:])

        return contexts
