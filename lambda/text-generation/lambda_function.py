import json
import boto3
import logging
from botocore.exceptions import ClientError

# Set up logging
logger = logging.getLogger()
logger.setLevel(logging.INFO)


def lambda_handler(event, context):
    ## Configuration
    region = "us-east-1"
    # Model: choose one of the following models to use
    # model_id = "anthropic.claude-3-5-haiku-20241022-v1:0"
    model_id = "amazon.nova-micro-v1:0"
    logger.info(f"Using model ID: {model_id}")

    # Prompt
    user_message = f"""Your task is to  
Recipient's name: {event['recipient']}
Sender's name: {event['sender']}
Holiday's name: {event['holiday']}
Relationship between the sender and the recipient: {event['relationship']}
Tone of the holiday card: {event['tone']}
Additional information: {event['additional_info']}
"""
    conversation = [
        {
            "role": "user",
            "content": [{"text": user_message}],
        },
    ]

    try:
        client = boto3.client("bedrock-runtime", region_name=region)

        response = client.converse(
            modelId="anthropic.claude-3-haiku-20240307-v1:0",
            messages=conversation,
            inferenceConfig={"maxTokens": 4096, "temperature": 0},
            additionalModelRequestFields={"top_k": 250},
        )
        # Extract and print the response text.
        response_text = response["output"]["message"]["content"][0]["text"]
        logger.info(response_text)
    except (ClientError, Exception) as e:
        logger.error(f"ERROR: Can't invoke '{model_id}'. Reason: {e}")
        return {"statusCode": 500, "body": json.dumps({"error": str(e)})}

    return {"statusCode": 200, "body": json.dumps(response_text)}
