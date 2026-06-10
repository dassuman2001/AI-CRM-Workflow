import csv
import io


class ExportCSV:

    @staticmethod
    def leads(leads):

        output = io.StringIO()

        writer = csv.writer(output)

        writer.writerow(

            [
                "ID",
                "Name",
                "Email",
                "Phone",
                "Company",
                "Status",
                "Priority",
                "AI Score",
                "Estimated Value",
            ]

        )

        for lead in leads:

            writer.writerow(

                [
                    lead.id,
                    lead.name,
                    lead.email,
                    lead.phone,
                    lead.company,
                    lead.status,
                    lead.priority,
                    lead.ai_score,
                    lead.estimated_value,
                ]

            )

        return output.getvalue()

    @staticmethod
    def companies(companies):

        output = io.StringIO()

        writer = csv.writer(output)

        writer.writerow(

            [
                "ID",
                "Name",
                "Website",
                "Industry",
                "Email",
                "Phone",
            ]

        )

        for company in companies:

            writer.writerow(

                [
                    company.id,
                    company.name,
                    company.website,
                    company.industry,
                    company.email,
                    company.phone,
                ]

            )

        return output.getvalue()

    @staticmethod
    def tasks(tasks):

        output = io.StringIO()

        writer = csv.writer(output)

        writer.writerow(

            [
                "ID",
                "Title",
                "Completed",
                "Due Date",
                "Lead ID",
            ]

        )

        for task in tasks:

            writer.writerow(

                [
                    task.id,
                    task.title,
                    task.completed,
                    task.due_date,
                    task.lead_id,
                ]

            )

        return output.getvalue()

    @staticmethod
    def notes(notes):

        output = io.StringIO()

        writer = csv.writer(output)

        writer.writerow(

            [
                "ID",
                "Title",
                "Content",
                "Lead ID",
            ]

        )

        for note in notes:

            writer.writerow(

                [
                    note.id,
                    note.title,
                    note.content,
                    note.lead_id,
                ]

            )

        return output.getvalue()