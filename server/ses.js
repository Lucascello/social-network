const aws = require("aws-sdk");

const { AWS_KEY, AWS_SECRET } = require("./secrets.json");

const ses = new aws.SES({
    accessKeyId: AWS_KEY,
    secretAccessKey: AWS_SECRET,
    region: "eu-west-1",
});

module.exports.sendEmail = function (subject, body, recipient) {
    return ses
        .sendEmail({
            Source: "Lucas <puddle.farmer@spicedling.email>",
            Destination: {
                ToAddresses: ["puddle.farmer@spicedling.email"],
            },
            Message: {
                Body: {
                    Text: {
                        Data: "Dear User, the code to retrieve your email account is:",
                    },
                },
                Subject: {
                    Data: "Recovering password",
                },
            },
        })
        .promise()
        .then(() => console.log("Email delivery successful"))
        .catch((err) => console.log(err));
};

// module.exports.sendEmail();
