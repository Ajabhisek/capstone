import json
from json import JSONEncoder
import numpy


def encode_to_json_text(data):
    class NumpyArrayEncoder(JSONEncoder):
        def default(self, obj):
            if isinstance(obj, numpy.ndarray):
                return obj.tolist()
            return JSONEncoder.default(self, obj)

    return json.dumps(data, cls=NumpyArrayEncoder)


def decode_from_json_text(data):
    return json.loads(data)
