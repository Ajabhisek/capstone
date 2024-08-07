from fastapi import FastAPI, UploadFile, Header
import uuid
from transformers import pipeline
from models.UserCreateDTO import UserCreateDTO
from models.UserLoginDTO import UserLoginDTO
from models.PasswordChangeDTO import PasswordChangeDTO
from fastapi.middleware.cors import CORSMiddleware
from typing import Annotated
from models.APIResponse import APIResponse
from models.PdfInfo import PdfInfo
from services.DatabaseHelper import DatabaseHelper
from models.ChatInfo import ChatInfo
from services.VectorStoreService import VectorStoreService
from services.ModelService import GeminiChat

origins = ["*"]

app = FastAPI()
db = DatabaseHelper()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# qa = pipeline("question-answering", model="my_saved_model_new")


## USER SECTION
@app.post("/user")
async def register(user: UserCreateDTO):
    try:
        db.insert_user_info(user)
        return {"status": True, "msg": "User registered successfully", "data": ""}
    except Exception as e:
        return {"status": False, "msg": e.args, "data": ""}


## USER SECTION
@app.post("/login")
async def register(user: UserLoginDTO):
    try:
        data = db.select_user_info(user)

        if data is None:
            return {"status": False, "msg": "Invalid credentials", "data": ""}

        [id, full_name, username, password] = data;

        return {"status": True, "msg": "User registered successfully",
                "data": {"id": id, "full_name": full_name, "username": username, "password": password}}

    except Exception as e:
        return {"status": False, "msg": e.args, "data": ""}

@app.post("/change-password")
async def register(user: PasswordChangeDTO):
    try:
        data = db.select_user_info_by_id_and_passwrd(user)

        if data is None:
            return {"status": False, "msg": "Your old password did not matched!!!", "data": ""}

        [id, full_name, username, password] = data;
        db.update_user_password(user)
        return {"status": True, "msg": "Password updated successfully", "data": ""}
    except Exception as e:
        return {"status": False, "msg": e.args, "data": ""}


## END OF USER SECTION


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/hello/{name}")
async def say_hello(name: str):
    return {"message": f"Hello {name}"}


def save_pdf(file: UploadFile):
    new_file_name = str(uuid.uuid4())
    file_path = f"files/{new_file_name}"
    with open(file_path, "wb") as f:
        f.write(file.file.read())

    vector_store = VectorStoreService(new_file_name)
    vector_store.save_vector()
    return new_file_name


@app.post("/upload/v2/")
async def create_upload_file_2(file: UploadFile, userId: Annotated[int | None, Header()] = None):
    try:
        if file.content_type != "application/pdf":
            return APIResponse(status=False, msg="File must be application/pdf")

        if userId is None:
            return APIResponse(status=False, msg="Forbidden, Access denied!!!")

        new_file_name = save_pdf(file)

        file_info = PdfInfo(
            file_name=file.filename,
            unique_id=new_file_name,
            context_content="",
            vector_content="",
            user_id=userId
        )
        file_info = db.insert_pdf_info(file_info)
        return APIResponse(status=True, msg="success!!!", data=file_info.unique_id)
    except Exception as e:
        return APIResponse(status=False, msg=e.args)


@app.post("/question-answer/")
async def ask_question(question="", unique_id=""):
    chat = GeminiChat(question, unique_id)
    answer = chat.get_answer()
    chat_info = ChatInfo(question=question, answer=answer["answer"], pdf=unique_id, score=answer["score"],context=answer["context"])
    updated_chat_info = db.insert_chat_info(chat_info)
    return APIResponse(status=True, msg="success!!!", data=updated_chat_info)


@app.post("/pdfs/")
async def read_pdfs(userId: Annotated[int, Header()] = None):
    try:
        return APIResponse(status=True, data=db.select_pdf_by_user_id(user_id=userId))
    except Exception as e:
        return APIResponse(status=False, msg=e.args)


@app.post("/chat-history/")
async def chat_histories(unique_id=""):
    try:
        return APIResponse(status=True, data=db.select_chat_info(unique_id=unique_id))
    except Exception as e:
        return APIResponse(status=False, msg=e.args)


@app.post("/single-chat-info/")
async def delete_single_chat(id=0):
    try:
        db.delete_chat_info(id)
        return APIResponse(status=True, data="")
    except Exception as e:
        return APIResponse(status=False, msg=e.args)


@app.post("/clear-info/")
async def clear_all_file_chat(unique_id=""):
    try:
        db.delete_all_chat_info(unique_id=unique_id)
        return APIResponse(status=True, data="")
    except Exception as e:
        return APIResponse(status=False, msg=e.args)


@app.post("/delete-file-info/")
async def delete_single_file(id=0):
    try:
        db.delete_pdf_by_id(id)
        return APIResponse(status=True, data="")
    except Exception as e:
        return APIResponse(status=False, msg=e.args)


@app.post("/clear-file/")
async def chat_histories(user_id=""):
    try:
        db.delete_pdf_by_user_id(user_id)
        return APIResponse(status=True, data="")
    except Exception as e:
        return APIResponse(status=False, msg=e.args)