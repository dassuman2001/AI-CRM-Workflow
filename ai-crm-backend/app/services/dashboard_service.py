from sqlalchemy import func

from app.models.lead import Lead
from app.models.company import Company
from app.models.task import Task
from app.models.note import Note


class DashboardService:

    @staticmethod
    def get_dashboard(db):

        total_leads = db.query(Lead).count()

        total_companies = db.query(Company).count()

        total_tasks = db.query(Task).count()

        total_notes = db.query(Note).count()

        high_priority = (

            db.query(Lead)

            .filter(

                Lead.priority == "HIGH"

            )

            .count()

        )

        completed_tasks = (

            db.query(Task)

            .filter(

                Task.completed == True

            )

            .count()

        )

        average_ai_score = round(

            db.query(

                func.avg(

                    Lead.ai_score

                )

            ).scalar()

            or 0,

            2,

        )

        estimated_revenue = (

            db.query(

                func.sum(

                    Lead.estimated_value

                )

            ).scalar()

            or 0

        )

        overview = {

            "total_leads": total_leads,

            "companies": total_companies,

            "tasks": total_tasks,

            "notes": total_notes,

            "high_priority": high_priority,

            "completed_tasks": completed_tasks,

            "average_ai_score": average_ai_score,

            "estimated_revenue": estimated_revenue,

        }

        pipeline = {

            "NEW":

            db.query(Lead)

            .filter(

                Lead.status == "NEW"

            )

            .count(),

            "CONTACTED":

            db.query(Lead)

            .filter(

                Lead.status == "CONTACTED"

            )

            .count(),

            "QUALIFIED":

            db.query(Lead)

            .filter(

                Lead.status == "QUALIFIED"

            )

            .count(),

            "PROPOSAL":

            db.query(Lead)

            .filter(

                Lead.status == "PROPOSAL"

            )

            .count(),

            "CLOSED":

            db.query(Lead)

            .filter(

                Lead.status == "CLOSED"

            )

            .count(),

        }

        lead_sources = {}

        priority_distribution = {}

        monthly_growth = {}

        leads = db.query(Lead).all()

        for lead in leads:

            source = lead.source or "Unknown"

            lead_sources[source] = (

                lead_sources.get(

                    source,

                    0,

                )

                + 1

            )

            priority = (

                lead.priority

                or "Unknown"

            )

            priority_distribution[priority] = (

                priority_distribution.get(

                    priority,

                    0,

                )

                + 1

            )

            month = (

                lead.created_at.strftime(

                    "%b"

                )

                if lead.created_at

                else "Unknown"

            )

            monthly_growth[month] = (

                monthly_growth.get(

                    month,

                    0,

                )

                + 1

            )

        recent_leads = []

        latest_leads = (

            db.query(Lead)

            .order_by(

                Lead.id.desc()

            )

            .limit(5)

            .all()

        )

        for item in latest_leads:

            recent_leads.append(

                {

                    "id": item.id,

                    "name": item.name,

                    "company": item.company,

                    "priority": item.priority,

                    "ai_score": item.ai_score,

                }

            )

        top_ai_leads = []

        top = (

            db.query(Lead)

            .order_by(

                Lead.ai_score.desc()

            )

            .limit(5)

            .all()

        )

        for item in top:

            top_ai_leads.append(

                {

                    "id": item.id,

                    "name": item.name,

                    "company": item.company,

                    "score": item.ai_score,

                }

            )

        recent_tasks = []

        latest_tasks = (

            db.query(Task)

            .order_by(

                Task.id.desc()

            )

            .limit(5)

            .all()

        )

        for task in latest_tasks:

            recent_tasks.append(

                {

                    "id": task.id,

                    "title": task.title,

                    "completed": task.completed,

                }

            )

        recent_notes = []

        latest_notes = (

            db.query(Note)

            .order_by(

                Note.id.desc()

            )

            .limit(5)

            .all()

        )

        for note in latest_notes:

            recent_notes.append(

                {

                    "id": note.id,

                    "title": note.title,

                }

            )

        highest = (

            db.query(Lead)

            .order_by(

                Lead.ai_score.desc()

            )

            .first()

        )

        ai_insights = {

            "highest_ai_lead":

            highest.name

            if highest

            else "-",

            "highest_ai_score":

            highest.ai_score

            if highest

            else 0,

            "estimated_revenue":

            estimated_revenue,

            "recommendation":

            "Focus on HIGH priority leads and complete pending follow-ups.",

        }

        return {

            "overview": overview,

            "pipeline": pipeline,

            "lead_sources": lead_sources,

            "priority_distribution": priority_distribution,

            "monthly_growth": monthly_growth,

            "recent_leads": recent_leads,

            "top_ai_leads": top_ai_leads,

            "recent_tasks": recent_tasks,

            "recent_notes": recent_notes,

            "ai_insights": ai_insights,

        }