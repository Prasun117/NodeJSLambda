const AWS = require("aws-sdk");
const accessID = "access_id"; //get the aws access accessID

const secreatID = "secret_id"; //get the aws secreatID

//configuring/connecting to aws account
const S3 = new AWS.S3({ accessKeyId: accessID, secretAccessKey: secreatID });

//uploading an object
const upload = async () => {
  const params = {
    ACL: "public-read",
    Body: "hello world",
    ContentType: "text/html",
    Bucket: "techdocs-storage-test",
    Key: "hello-world",
  };

  const responce = await new Promise((resolve, reject) => {
    S3.putObject(params, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
  console.log(responce);

  //   return await new Promise((resolve, reject) => {
  //     S3.putObject(params, (err, result) => {
  //       if (err) reject(err);
  //       else resolve(result);
  //     });
  //   });
};

// creating a new bucket
const createBucket = () => {
  const params = {
    Bucket: "creating-bucket-using-node",
    CreateBucketConfiguration: {
      // Set your region here
      LocationConstraint: "ap-southeast-1",
    },
  };

  S3.createBucket(params, function (err, data) {
    if (err) console.log(err, err.stack);
    else console.log("Bucket Created Successfully", data.Location);
  });
};

const main = async (event) => {
  console.log("event: " + event);
  return upload();
};

exports.handler = upload;
