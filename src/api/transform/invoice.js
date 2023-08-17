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
                employer: result.user.name
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
        total: data.total,
        discount: data.discount,
        isSend: data.is_send,
        grandTotal: data.grand_total,
        created: dayjs(data.created).format("DD-MM-YYYY"),
        points: data.points,
        user: {
            id: data.user.id,
            name: data.user.name,
            email: data.user.email,
            country_code: data.user.country_code,
            mobileNumber: data.user.country_code + data.user.mobile_number,
            // image: {
            //     title: data.user.image.title,
            //     path: data.user.image.path,
            // },
        },
        detail: data.detail.map((details) => {
            return {
                id: details.id,
                points: details.points,
                amount: "$" + details.amount,
                created: dayjs(details.created).format("DD-MM-YYYY"),
            };
        }),
    };
};
