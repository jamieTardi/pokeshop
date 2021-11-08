import aws from 'aws-sdk';
import dotenv from 'dotenv';
import crypto, { randomBytes } from 'crypto';
import { promisify } from 'util';
dotenv.config();

const region = 'us-west-2';
const bucketName = 'pokedecks';
const accessKeyId = process.env.ACCESS_KEY_S3;
const secretAccessKey = process.env.SECRET_KEY_S3;

const s3 = new aws.S3({
	region,
	accessKeyId,
	secretAccessKey,
	signatureVersion: 'v4',
});

export const generateUploadURL = async () => {
	const rawBytes = await randomBytes(16);

	const imageName = rawBytes.toString('hex');

	const params = {
		Bucket: bucketName,
		Key: imageName,
		Expires: 600,
	};

	const uploadURL = await s3.getSignedUrlPromise('putObject', params);
	return uploadURL;
};
