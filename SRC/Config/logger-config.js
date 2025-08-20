import {createLogger , format , transports} from "winston";

const {combine , timestamp, label , printf } = format;

const CustomeFormat = printf(({level , message , timestamp}) => {
    return `${timestamp} : ${level} : ${message}`;
});

const logger = createLogger({
  format: combine(
    timestamp({format: "YYYY-MM-DD HH:mm:ss"}),
    CustomeFormat
  ),
  transports: [
    new transports.Console(),
    new transports.File({filename:"Combined.log"})
  ],
});
export
{
    logger,

}