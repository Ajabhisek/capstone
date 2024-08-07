from sentence_transformers import SentenceTransformer
import pandas as pd


def context_data_to_vectors(context_data):
    df = pd.DataFrame(context_data, columns=["text"])
    text = df['text']
    encoder = SentenceTransformer("paraphrase-mpnet-base-v2")
    vectors = encoder.encode(text)
    return vectors
