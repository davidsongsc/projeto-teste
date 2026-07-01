const orderInclude = {
    items: {
        include: { item: true }
    },
    user: {
        select: { name: true }
    },
    customer: {
        select: { name: true }
    }
};

export default orderInclude;