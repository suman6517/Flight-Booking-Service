import cron from "node-cron";

function secheduleCrons() {
  cron.schedule("*/30 * * * * ", async () => {
    console.log("Starting Cron Job");

    const { BookingService } = await import("../../Services/index.js");
    const response = await BookingService.cancelOldBooking();
    console.log(response);
  });
}

export { secheduleCrons };
