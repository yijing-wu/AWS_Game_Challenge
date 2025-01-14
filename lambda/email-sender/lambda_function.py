import boto3
import json
import logging

# Set up logging
logger = logging.getLogger()
logger.setLevel(logging.INFO)


def lambda_handler(event, context):

    logger.info(f"Received event: {event}")

    ses_client = boto3.client("ses", region_name="us-east-1")

    # phrase event body
    body = json.loads(event["body"])
    to_email = body["to"]
    subject = "Your Digital Card Delivery!"
    html_body = body["html_body"]

    sender = "support@makedigitalcards.xyz"
    sender_name = "Make Digital Cards"

    try:
        response = ses_client.send_email(
            Source=f"{sender_name} <{sender}>",
            Destination={"ToAddresses": [to_email]},
            Message={
                "Subject": {"Data": subject},
                "Body": {
                    "Html": {"Data": html_body},
                },
            },
        )
        return {"statusCode": 200, "body": json.dumps("Email sent successfully!")}
    except Exception as e:
        return {"statusCode": 500, "body": f"Failed to send email: {str(e)}"}
