import fakeData from '@/lib/mock-json.json';
import { createAsyncThunk } from '@reduxjs/toolkit';

type Agent = {
    id: string;
    name: string;
    description: string;
    status: string;
    category: string;
    pricingModel: string;
};

export const getAgents = createAsyncThunk<Agent[]>('agents/getAgents', async () => {
    return new Promise<Agent[]>((resolve) => {
        setTimeout(() => {
            resolve(fakeData as Agent[]);
        }, 1000);
    });
});
