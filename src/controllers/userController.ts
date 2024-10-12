import { Request, Response } from 'express';
import User, { IUser } from '../models/userModel';
import { ApiResponse } from '../Types/apiResponse';

export const createUser = async (req: Request, res: Response<ApiResponse>) => {
    const { username, firstName, lastName, email, phone } = req.body;
    const newUser = new User({ username, firstName, lastName, email, phone });

    try {
        const savedUser = await newUser.save();
        res.status(201).json({ success: true, data: savedUser });
    } catch (error) {
        res.status(400).json({ success: false, error: error instanceof Error ? error.message : 'Error creating user' });
    }
};

export const getAllUsers = async (req: Request, res: Response<ApiResponse>) => {
    try {
        const users = await User.find();
        res.json({ success: true, data: users });
    } catch (error) {
        res.status(500).json({ success: false, error: error instanceof Error ? error.message : 'Error retrieving users' });
    }
};

export const getUserById = async (req: Request, res: Response<ApiResponse<IUser | null>>): Promise<void> => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            res.status(404).json({ success: false, message: 'User not found' });
        } else {
            res.status(200).json({ success: true, data: user });
        }

    } catch (error) {
        console.error('Error retrieving user:', error);
        res.status(500).json({ success: false, error: 'Error retrieving user' });
    }
};

export const updateUser = async (req: Request, res: Response<ApiResponse<IUser | null>>): Promise<void> => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!user) {
            res.status(404).json({ success: false, message: 'User not found' });
        } else {
            res.status(200).json({ success: true, data: user });
        }

    } catch (error) {
        console.error('Error updating user:', error);
        res.status(400).json({ success: false, error: error instanceof Error ? error.message : 'Error updating user' });
    }
};

export const deleteUser = async (req: Request, res: Response<ApiResponse<{ message: string } | null>>): Promise<void> => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            res.status(404).json({ success: false, message: 'User not found' });
        } else {
            res.status(200).json({ success: true, data: { message: 'User deleted' } });
        }

    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ success: false, error: 'Error deleting user' });
    }
};

