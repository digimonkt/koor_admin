import dayjs from "dayjs";

export const transformInvoiceListAPI = (data) => {
  return {
    count: data.count,
    next: data.next,
    previous: data.previous,
    results: data.results.map((result) => {
      return {
        id: result.id,
        discount: result.discount,
        date: dayjs(result.created).format("DD-MM-YYYY"),
        grandTotal: result.grand_total,
        invoiceId: result.invoice_id,
        isSend: !result.is_send ? "No" : "Yes",
        points: result.points,
        startDate: result.start_date,
        total: "$" + result.total,
        employerId: result.user.id,
        employer: result.user.name,
      };
    }),
  };
};

export const transformInvoiceDetailsAPI = (data) => {
  return {
    id: data.id,
    startDate: data.start_date,
    endDate: data.end_date,
    invoiceId: data.invoice_id,
    total: "$" + data.total,
    discount: "$" + data.discount,
    isSend: data.is_send,
    grandTotal: "$" + data.grand_total,
    createdDate: dayjs(data.created).format("MMMM D, YYYY h:mm A"),
    points: data.points,
    user: {
      id: data.user.id,
      name: data.user.name,
      email: data.user.email,
      country_code: data.user.country_code,
      mobileNumber: data.user.country_code + "-" + data.user.mobile_number,
    },
    detail: [
      {
        id: data.id,
        Serialnumber: 1,
        points: data.points,
        amount: "$" + data.points,
        created: dayjs(data.created).format("MMMM D, YYYY h:mm A"),
        note: data.job_title || "",
      },
    ],

    // detail: data.detail.map((details, idx) => {
    //   return {
    //     id: details.id,
    //     Serialnumber: idx + 1,
    //     points: details.points,
    //     amount: "$" + details.amount,
    //     created: dayjs(details.created).format("MMMM D, YYYY h:mm A"),
    //     note: details.note || `Point updated by koor admin (${details.points})`,
    //   };
    // }),
  };
};
