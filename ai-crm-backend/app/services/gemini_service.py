from openai import OpenAI

from app.core.config import settings


class GeminiService:

    MODELS = [

        "openrouter/free",

        "qwen/qwen3-next-80b-a3b-instruct:free",

        "meta-llama/llama-3.3-70b-instruct:free",

        "nvidia/llama-3.1-nemotron-ultra-253b-v1:free",

    ]

    @staticmethod
    def generate(prompt: str):

        client = OpenAI(
            base_url="https://openrouter.ai/api/v1",
            api_key=settings.OPENROUTER_API_KEY,
        )

        last_error = None

        for model in GeminiService.MODELS:

            try:

                response = (
                    client.chat.completions.create(

                        model=model,

                        messages=[
                            {
                                "role": "system",
                                "content":
                                "You are an expert CRM AI assistant."
                            },
                            {
                                "role": "user",
                                "content": prompt
                            }
                        ],

                        temperature=0.7,
                        max_tokens=1500,
                    )
                )

                return (
                    response
                    .choices[0]
                    .message.content
                )

            except Exception as e:

                print(
                    f"Model failed: {model}"
                )

                last_error = e

        raise last_error