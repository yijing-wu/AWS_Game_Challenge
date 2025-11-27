import AWS from 'aws-sdk';

export async function uploadToS3(audioBlob, fileName) {

    try {
        // Configure the S3 client with AWS Access Key and Secret Access Key
        const s3Client = new AWS.S3({
            accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
            secretAccessKey: process.env.REACT_APP_AWS_ACCESS_SECRET,
            region: process.env.REACT_APP_AWS_REGION
        });

        // Check if bucket name is available
        const bucketName = process.env.REACT_APP_S3_BUCKET_NAME;
        if (!bucketName) {
            throw new Error('S3 bucket name not configured. Please check REACT_APP_S3_BUCKET_NAME environment variable.');
        }

        // Set up the parameters for upload
        const params = {
            Bucket: bucketName,
            Key: `${fileName}.wav`,
            Body: audioBlob,
            ContentType: 'audio/wav',
            ACL: 'public-read'
        };

        // Upload to S3
        const response = await s3Client.upload(params).promise();
        console.log(`Successfully uploaded ${fileName}.wav to S3`);
        return {
            key: `${fileName}.wav`,
            response
        };

    } catch (error) {
        console.error('Error uploading to S3:', error);
        throw error;
    }
}
