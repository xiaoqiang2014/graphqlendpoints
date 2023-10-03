const axios = require('axios');

const API_BASE_URL = 'http://api.example.com'; // Replace with your API base URL

const resolvers = {
    Query: {
        // Add your query resolvers here
    },
    Mutation: {
        registerGuest: async (_, { name, email, password }) => {
            // Existing code for registering a guest user
        },
        registerEmployee: async (_, { name, email, password }) => {
            // Existing code for registering an employee user
        },
        loginGuest: async (_, { email, password }) => {
            // Existing code for logging in a guest user
        },
        loginEmployee: async (_, { email, password }) => {
            // Existing code for logging in an employee user
        },
        createReservation: async (_, { reservationInput }) => {
            try {
                const {
                    guestName,
                    guestContactInfo,
                    expectedArrivalTime,
                    reservedTableSize,
                    status,
                    token,
                } = reservationInput;

                // Check user permission using the provided token
                const { data, db } = await checkPermission(token);

                if (data.error) {
                    return { error: data.message };
                }

                const response = await axios.post(`${API_BASE_URL}/reservations`, {
                    guestName,
                    guestContactInfo,
                    expectedArrivalTime,
                    reservedTableSize,
                    status,
                });

                return response.data;
            } catch (error) {
                console.log(error);
                throw new Error('An error occurred');
            }
        },
        updateReservation: async (_, { reservationId, reservationInput }) => {
            try {
                const { guestName, guestContactInfo, expectedArrivalTime, reservedTableSize } = reservationInput;
                const token = reservationInput.token;

                // Check user permission using the provided token
                const { data, db } = await checkPermission(token);

                if (data.error) {
                    return { error: data.message };
                }

                const response = await axios.put(`${API_BASE_URL}/reservations/${reservationId}`, {
                    guestName,
                    guestContactInfo,
                    expectedArrivalTime,
                    reservedTableSize,
                });

                return response.data;
            } catch (error) {
                console.log(error);
                throw new Error('An error occurred');
            }
        },
        getAllGuestReservations: async (_, { page, pageSize, token }) => {
            try {
                // Check user permission using the provided token
                const { data, db } = await checkPermission(token);

                if (data.error) {
                    return { error: data.message };
                }

                const response = await axios.get(`${API_BASE_URL}/reservations`, {
                    params: {
                        page,
                        pageSize,
                    },
                });

                return response.data;
            } catch (error) {
                console.log(error);
                throw new Error('An error occurred');
            }
        },
        searchGuestReservations: async (_, { date, status, token }) => {
            try {
                // Check user permission using the provided token
                const { data, db } = await checkPermission(token);

                if (data.error) {
                    return { error: data.message };
                }

                const response = await axios.get(`${API_BASE_URL}/reservations`, {
                    params: {
                        date,
                        status,
                    },
                });

                return response.data;
            } catch (error) {
                console.log(error);
                throw new Error('An error occurred');
            }
        },
        updateGuestReservation: async (_, { reservationId, status, token }) => {
            try {
                // Check user permission using the provided token
                const { data, db } = await checkPermission(token);

                if (data.error) {
                    return { error: data.message };
                }

                const response = await axios.put(`${API_BASE_URL}/reservations/${reservationId}`, {
                    status,
                });

                return response.data;
            } catch (error) {
                console.log(error);
                throw new Error('An error occurred');
            }
        },
    },
};

module.exports = resolvers;