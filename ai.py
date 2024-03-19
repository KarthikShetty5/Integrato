import ast
import tensorflow as tf
from code2vec.extractor import Extractor


model_path = "models/code2vec_model"
model = tf.keras.models.load_model(model_path)
extractor = Extractor(model)

def detect_vulnerabilities_with_ai(code_snippet):
    try:
        features = extractor.extract(code_snippet)
        prediction = model.predict([features])[0]
        threshold = 0.5
        return prediction > threshold
    except Exception as e:
        print(f"Error in vulnerability detection: {e}")
        return False


if __name__ == "__main__":
    code_file_path = "main.py"

    try:
        with open(code_file_path, 'r', encoding='utf-8') as file:
            code_snippet = file.read()

            # Parse the code snippet using AST to remove comments and docstrings
            parsed_code = ast.parse(code_snippet)
            clean_code_snippet = ast.get_source_segment(parsed_code)

            # Assuming you have a function to detect vulnerabilities using AI
            if detect_vulnerabilities_with_ai(clean_code_snippet):
                print("Vulnerability detected!")
            else:
                print("No vulnerabilities detected.")
    except FileNotFoundError:
        print(f"File not found: {code_file_path}")
    except Exception as e:
        print(f"Error: {e}")
