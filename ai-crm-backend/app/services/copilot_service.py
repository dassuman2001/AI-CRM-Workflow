from app.models.lead import Lead
from app.models.task import Task

from app.services.gemini_service import GeminiService


class CopilotService:

    @staticmethod
    def pipeline_summary(leads):

        total = len(leads)

        high = len(
            [
                lead
                for lead in leads
                if lead.priority == "HIGH"
            ]
        )

        medium = len(
            [
                lead
                for lead in leads
                if lead.priority == "MEDIUM"
            ]
        )

        low = len(
            [
                lead
                for lead in leads
                if lead.priority == "LOW"
            ]
        )

        scores = [
            lead.ai_score
            for lead in leads
            if lead.ai_score
        ]

        avg_score = 0

        if scores:

            avg_score = round(
                sum(scores) / len(scores)
            )

        return f"""
📊 Pipeline Summary

Total Leads: {total}

High Priority: {high}

Medium Priority: {medium}

Low Priority: {low}

Average AI Score: {avg_score}
"""

    @staticmethod
    def high_priority_leads(leads):

        filtered = [

            lead

            for lead in leads

            if lead.priority == "HIGH"

        ]

        if not filtered:

            return "No high priority leads found."

        response = "🔥 High Priority Leads\n\n"

        for lead in filtered:

            response += f"""
• {lead.name}

  Company: {lead.company}

  AI Score: {lead.ai_score}

"""

        return response

    @staticmethod
    def best_lead(leads):

        if not leads:

            return "No leads available."

        best = max(
            leads,
            key=lambda x: x.ai_score or 0
        )

        return f"""
🏆 Best Lead To Contact

Name: {best.name}

Company: {best.company}

AI Score: {best.ai_score}

Priority: {best.priority}

Recommended Action:

{best.next_action}
"""

    @staticmethod
    def pending_tasks(tasks):

        pending = [

            task

            for task in tasks

            if not task.completed

        ]

        if not pending:

            return "✅ No pending tasks."

        response = "📋 Pending Tasks\n\n"

        for task in pending:

            response += f"""
• {task.title}
"""

        return response

    @staticmethod
    def local_fallback(
        message,
        leads,
        tasks,
    ):

        msg = message.lower()

        if (
            "pipeline" in msg
            or "summary" in msg
        ):

            return CopilotService.pipeline_summary(
                leads
            )

        if (
            "high priority" in msg
            or "priority leads" in msg
        ):

            return CopilotService.high_priority_leads(
                leads
            )

        if (
            "contact first" in msg
            or "best lead" in msg
            or "which lead" in msg
        ):

            return CopilotService.best_lead(
                leads
            )

        if (
            "task" in msg
            or "pending" in msg
        ):

            return CopilotService.pending_tasks(
                tasks
            )

        return """
I am currently unable to access advanced AI reasoning.

However I can still help with:

• Pipeline summaries
• Lead prioritization
• High priority leads
• Pending tasks
• CRM analytics

Try asking a CRM-related question.
"""

    @staticmethod
    def chat(
        db,
        message: str,
    ):

        leads = db.query(
            Lead
        ).all()

        tasks = db.query(
            Task
        ).all()

        all_leads_context = ""

        for lead in leads:

            all_leads_context += f"""
Lead Name: {lead.name}
Company: {lead.company}
Priority: {lead.priority}
Status: {lead.status}
AI Score: {lead.ai_score}
Estimated Value: {lead.estimated_value}
Next Action: {lead.next_action}

"""

        all_tasks_context = ""

        for task in tasks:

            all_tasks_context += f"""
Task: {task.title}
Completed: {task.completed}
Description: {task.description}

"""

        msg = message.lower()

        lead_context = ""
        task_context = ""

        if "lead" in msg or "pipeline" in msg or "priority" in msg:
            lead_context = all_leads_context

        if "task" in msg or "pending" in msg:
            task_context = all_tasks_context

        prompt = f"""
You are AI CRM Copilot.

You are an intelligent CRM assistant integrated into a business CRM system.

Rules:

1. Answer naturally and professionally.

2. If the question is about CRM leads,
   use ONLY CRM LEADS.

3. If the question is about CRM tasks,
   use ONLY CRM TASKS.

4. If the question is about programming, Java, Python,
   business, sales, marketing, greetings or general knowledge,
   answer normally without mentioning CRM data.

5. Never include unrelated CRM information.

6. Never reveal the entire CRM database unless the user explicitly asks.

7. Never say you are ChatGPT, GPT-4 or OpenAI.

If asked who you are, reply:

"I am AI CRM Copilot integrated into this CRM platform."

8. Keep answers short and professional.

-------------------------

CRM LEADS

{lead_context}

-------------------------

CRM TASKS

{task_context}

-------------------------

USER QUESTION

{message}

Provide the best possible answer.
"""

        try:

            return GeminiService.generate(
                prompt
            )

        except Exception as e:

            import traceback

            print("\n")
            print("========== COPILOT ERROR ==========")
            print(str(e))
            traceback.print_exc()
            print("===================================")
            print("\n")

            return CopilotService.local_fallback(
                message,
                leads,
                tasks,
            )
