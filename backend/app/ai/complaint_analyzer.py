from textblob import TextBlob


class ComplaintAnalyzer:

    DEPARTMENT_MAP = {
        "Road": "Public Works Department",
        "Sanitation": "Municipal Sanitation Department",
        "Water Supply": "Water Supply Department",
        "Electricity": "Electricity Department",
        "General": "General Administration",
    }

    @staticmethod
    def analyze(title: str, description: str):
        text = f"{title} {description}"
        lower_text = text.lower()

        # ---------- Category Detection ----------
        if any(word in lower_text for word in [
            "road", "pothole", "street", "traffic"
        ]):
            ai_category = "Road"

        elif any(word in lower_text for word in [
            "garbage", "waste", "dustbin", "clean"
        ]):
            ai_category = "Sanitation"

        elif any(word in lower_text for word in [
            "water", "pipe", "leak", "drain"
        ]):
            ai_category = "Water Supply"

        elif any(word in lower_text for word in [
            "electric", "electricity", "power"
        ]):
            ai_category = "Electricity"

        else:
            ai_category = "General"

        # ---------- Department ----------
        department = ComplaintAnalyzer.DEPARTMENT_MAP.get(
            ai_category,
            "General Administration",
        )

        # ---------- Urgency Score ----------
        score = 0

        if any(word in lower_text for word in [
            "accident",
            "death",
            "injury",
            "fire",
            "collapsed",
            "emergency",
        ]):
            score += 90

        if any(word in lower_text for word in [
            "danger",
            "urgent",
            "severe",
            "critical",
        ]):
            score += 30

        if any(word in lower_text for word in [
            "large",
            "broken",
            "damaged",
            "huge",
        ]):
            score += 20

        score = min(score, 100)

        # ---------- Priority ----------
        if score >= 90:
            ai_priority = "Critical"
        elif score >= 70:
            ai_priority = "High"
        elif score >= 40:
            ai_priority = "Medium"
        else:
            ai_priority = "Low"

        # ---------- Sentiment ----------
        polarity = TextBlob(text).sentiment.polarity

        if polarity > 0.2:
            sentiment = "Positive"
        elif polarity < -0.2:
            sentiment = "Negative"
        else:
            sentiment = "Neutral"

        return {
            "ai_category": ai_category,
            "department": department,
            "ai_priority": ai_priority,
            "urgency_score": score,
            "sentiment": sentiment,
        }