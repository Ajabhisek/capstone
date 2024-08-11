import sqlite3
from models.ChatInfo import ChatInfo
from models import PdfInfo
from models.UserCreateDTO import UserCreateDTO
from models.UserLoginDTO import UserLoginDTO
from models.PasswordChangeDTO import PasswordChangeDTO


class DatabaseHelper:
    def __init__(self):
        self.connection = sqlite3.connect('chat_with_pdf.db')
        self.create_user_info_table()
        self.create_pdf_info_table()
        self.create_chat_info_table()

    def create_pdf_info_table(self):
        try:
            self.connection.execute('''CREATE TABLE IF NOT EXISTS PDF_INFO
                            (
                                ID INTEGER PRIMARY KEY   AUTOINCREMENT,
                                FILE_NAME CHAR(100) NOT NULL,
                                UNIQUE_ID NOT NULL,
                                CONTEXT_CONTENT TEXT NOT NULL,
                                VECTOR_CONTENT TEXT NOT NULL,
                                USER_ID INTEGER NOT NULL
                            );''')
        except sqlite3.Error as error:
            print(error)

    def create_user_info_table(self):
        try:
            self.connection.execute('''CREATE TABLE IF NOT EXISTS USER_INFO
                            (
                                ID INTEGER PRIMARY KEY   AUTOINCREMENT,
                                FULL_NAME CHAR(200) NOT NULL,
                                USERNAME CHAR(50) NOT NULL,
                                PASSWORD CHAR(50) NOT NULL
                            );''')
        except sqlite3.Error as error:
            print(error)

    def create_chat_info_table(self):
        try:
            self.connection.execute('''CREATE TABLE IF NOT EXISTS CHAT_INFO
                            (
                                ID INTEGER PRIMARY KEY   AUTOINCREMENT,
                                PDF CHAR NOT NULL,
                                QUESTION TEXT NOT NULL,
                                ANSWER TEXT NOT NULL,
                                SCORE DECIMAL(10,2) NOT NULL,
                                CONTEXT TEXT NOT NULL
                            );''')
        except sqlite3.Error as error:
            print(error)

    def insert_user_info(self, user: UserCreateDTO):
        cursor = self.connection.cursor()
        cursor.execute('''INSERT INTO USER_INFO (FULL_NAME, USERNAME, PASSWORD) VALUES (?,?,?)''',
                       (user.fullName, user.username, user.password))
        user.id = cursor.lastrowid
        self.connection.commit()
        return user

    def insert_pdf_info(self, pdf_info: PdfInfo):
        cursor = self.connection.cursor()
        cursor.execute(
            '''INSERT INTO PDF_INFO (FILE_NAME, UNIQUE_ID, CONTEXT_CONTENT, VECTOR_CONTENT,USER_ID) VALUES (?,?,?,?,?)''',
            (pdf_info.file_name, pdf_info.unique_id, pdf_info.context_content, pdf_info.vector_content,
             pdf_info.user_id))
        pdf_info.id = cursor.lastrowid
        self.connection.commit()
        return pdf_info

    def insert_chat_info(self, chat_info: ChatInfo):
        cursor = self.connection.cursor()
        cursor.execute(
            '''INSERT INTO CHAT_INFO (PDF,QUESTION,ANSWER,SCORE,CONTEXT) VALUES (?,?,?,?,?)''',
            (chat_info.pdf, chat_info.question, chat_info.answer,chat_info.score, chat_info.context))
        chat_info.id = cursor.lastrowid
        self.connection.commit()
        return chat_info

    def select_pdf_info(self, unique_id):
        cursor = self.connection.cursor()
        cursor.execute("SELECT * FROM PDF_INFO WHERE unique_id=?;", (unique_id,))
        data = cursor.fetchone()
        self.connection.commit()
        return data

    def select_pdf_by_user_id(self, user_id):
        cursor = self.connection.cursor()
        cursor.execute("SELECT ID,FILE_NAME AS fileName,UNIQUE_ID as uniqueId,USER_ID as userId FROM PDF_INFO WHERE user_id=?;", (user_id,))
        data = cursor.fetchall()
        self.connection.commit()
        return data

    def delete_pdf_by_id(self, id):
        cursor = self.connection.cursor()
        cursor.execute("DELETE FROM PDF_INFO WHERE id=?;", (id,))
        self.connection.commit()

    def delete_pdf_by_user_id(self, user_id):
        cursor = self.connection.cursor()
        cursor.execute("DELETE FROM PDF_INFO WHERE USER_ID=?;", (user_id,))
        self.connection.commit()

    def select_user_info(self, user_login: UserLoginDTO):
        cursor = self.connection.cursor()
        cursor.execute("SELECT * FROM USER_INFO WHERE USERNAME=? AND PASSWORD=?;",
                       (user_login.username, user_login.password))
        data = cursor.fetchone()
        self.connection.commit()
        return data

    def select_user_info_by_id_and_passwrd(self, change_password: PasswordChangeDTO):
        cursor = self.connection.cursor()
        cursor.execute("SELECT * FROM USER_INFO WHERE ID=? AND PASSWORD=?;",
                       (change_password.id, change_password.oldPassword))
        data = cursor.fetchone()
        self.connection.commit()
        return data

    def update_user_password(self, change_password: PasswordChangeDTO):
        cursor = self.connection.cursor()
        cursor.execute("UPDATE USER_INFO SET PASSWORD=? WHERE ID=?;",
                       (change_password.newPassword, change_password.id))
        self.connection.commit()


    def select_chat_info(self, unique_id):
        cursor = self.connection.cursor()
        cursor.execute("SELECT * FROM CHAT_INFO WHERE PDF=?;", (unique_id,))
        data = cursor.fetchall()
        self.connection.commit()
        return data

    def delete_chat_info(self, id):
        cursor = self.connection.cursor()
        cursor.execute("DELETE FROM CHAT_INFO WHERE ID=?;", (id,))
        self.connection.commit()

    def delete_all_chat_info(self,unique_id):
        cursor = self.connection.cursor()
        cursor.execute("DELETE FROM CHAT_INFO WHERE UNIQUE_ID=?;",(unique_id,))
        self.connection.commit()