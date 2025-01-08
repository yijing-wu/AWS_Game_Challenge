import json
import boto3
import logging
from botocore.exceptions import ClientError

from prompts import *

# Set up logging
logger = logging.getLogger()
logger.setLevel(logging.INFO)


def lambda_handler(event, context):
    print(event)
    ## Configuration
    region = "us-east-1"
    # Model: choose one of the following models to use
    # model_id = "anthropic.claude-3-5-haiku-20241022-v1:0"
    model_id = "amazon.nova-micro-v1:0"
    logger.info(f"Using model ID: {model_id}")

    # Phrase event body
    body = json.loads(event["body"])

    # Prompt
    # Holiday: Christmas, New Year, Thanksgiving, Halloween, Valentine's Day, Mother's Day, Father's Day, Birthday, Graduation, Wedding, Baby Shower, Anniversary, Retirement, Get Well Soon, Sympathy, Thank You, Congratulations, Thinking of You, Just Because, Other
    # Tone: Friendly, Grateful, Professional, Casual, Loving, Sympathetic, Humorous, Inspirational, Religious, Formal
    #       Avoid humorous and funny as it will bring hallucinations
    # Relationship: Family, Friend, Coworker, Boss, Client, Other
    # Additional information: Any additional information you want to provide to the model
    user_message = f"""
To: {body['to']}
From: {body['from']}
Holiday: {body['holiday']}
Relationship: {body['relationship']}
Tone: {body['tone']}
Additional information: {body['additional_info']}
"""

    conversation = [
        {"role": "user", "content": [{"text": guidelines}]},
        {
            "role": "assistant",
            "content": [
                {
                    "text": "I understand. I will write holiday cards following these guidelines, maintaining appropriate tone and format."
                }
            ],
        },
        {"role": "user", "content": [{"text": user_message_ex1}]},
        {"role": "assistant", "content": [{"text": assistant_message_ex1}]},
        {"role": "user", "content": [{"text": user_message_ex2}]},
        {"role": "assistant", "content": [{"text": assistant_message_ex2}]},
        {"role": "user", "content": [{"text": user_message_ex3}]},
        {"role": "assistant", "content": [{"text": assistant_message_ex3}]},
        {"role": "user", "content": [{"text": user_message}]},
    ]

    try:
        client = boto3.client("bedrock-runtime", region_name=region)

        response = client.converse(
            modelId="anthropic.claude-3-haiku-20240307-v1:0",
            messages=conversation,
            inferenceConfig={"maxTokens": 4096, "temperature": 0.2},
            additionalModelRequestFields={"top_k": 250},
        )
        # Extract and print the response text.
        response_text = response["output"]["message"]["content"][0]["text"]
        logger.info(response_text)
    except (ClientError, Exception) as e:
        logger.error(f"ERROR: Can't invoke '{model_id}'. Reason: {e}")
        return {"statusCode": 500, "body": json.dumps({"error": str(e)})}

    return {"statusCode": 200, "body": json.dumps(response_text)}
