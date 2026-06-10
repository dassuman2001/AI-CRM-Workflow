import json
import re

from app.services.gemini_service import GeminiService


class AIService:

    @staticmethod
    def analyze_lead(lead):

        prompt = f"""
You are an expert CRM AI.

Analyze this lead.

Return ONLY valid JSON.

{{
    "ai_score":90,
    "ai_summary":"summary",
    "next_action":"next action",
    "followup_email":"email body"
}}

Lead Name: {lead.name}

Company: {lead.company}

Status: {lead.status}

Priority: {lead.priority}

Source: {lead.source}

Estimated Value: {lead.estimated_value}
"""

        result = GeminiService.generate(prompt)

        try:

            result = re.sub(
                r"```json|```",
                "",
                result,
            ).strip()

            return json.loads(result)

        except Exception:

            return {

                "ai_score": 50,

                "ai_summary": result,

                "next_action": "Follow up with customer",

                "followup_email": result,

            }
        


    @staticmethod
    def meeting_summary(

        notes,

    ):

        prompt = f"""
    You are an expert sales assistant.

    Analyze the meeting notes.

    Return ONLY valid JSON.

    {{
        "summary":"...",

        "action_items":[
            "...",
            "..."
        ],

        "risks":[
            "..."
        ]
    }}

    Meeting Notes:

    {notes}
    """

        return GeminiService.generate(
            prompt
        )