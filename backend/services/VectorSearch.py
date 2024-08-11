from services.JSONEncoder import decode_from_json_text
import pandas as pd
import numpy as np
import faiss
from sentence_transformers import SentenceTransformer


class VectorSearch:
    def __init__(self, context_content, vector_content):
        self.context_content = context_content
        self.vector_content = vector_content
        self.context_data = decode_from_json_text(context_content)["data"]
        self.vector_data = decode_from_json_text(vector_content)["data"]
        self.df = pd.DataFrame(self.context_data, columns=["text"])
        self.vectors = np.asarray(self.vector_data).astype("float32")
        self.vector_dimension = self.vectors.shape[1]
        self.index = faiss.IndexFlatL2(self.vector_dimension)
        self.encoder = SentenceTransformer("paraphrase-mpnet-base-v2")
        self.initialize_faiss()

    def initialize_faiss(self):
        faiss.normalize_L2(self.vectors)
        self.index.add(self.vectors)
    
    def select_context(self,question):
        search_vector = self.encoder.encode(question)
        _vector = np.array([search_vector])
        faiss.normalize_L2(_vector)
        k = self.index.ntotal
        distances, ann = self.index.search(_vector, k=k)
        results = pd.DataFrame({'distances': distances[0], 'ann': ann[0]})
        merge = pd.merge(results, self.df, left_on='ann', right_index=True)
        first,second,*rest = merge["text"]
        return [first,second]