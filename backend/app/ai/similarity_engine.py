from sentence_transformers import SentenceTransformer, util


class SimilarityEngine:
    # Load the model only once
    model = SentenceTransformer("all-MiniLM-L6-v2")

    @staticmethod
    def similarity(text1: str, text2: str) -> float:
        """
        Returns similarity between two texts as a percentage (0-100).
        """

        embedding1 = SimilarityEngine.model.encode(
            text1,
            convert_to_tensor=True
        )

        embedding2 = SimilarityEngine.model.encode(
            text2,
            convert_to_tensor=True
        )

        score = util.cos_sim(
            embedding1,
            embedding2
        ).item()

        return round(score * 100, 2)