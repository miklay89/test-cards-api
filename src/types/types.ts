import { Request, Response } from "express";
// eslint-disable-next-line import/no-unresolved
import { Send } from "express-serve-static-core";

export interface TypedResponse<ResBody> extends Response {
  json: Send<ResBody, this>;
}

export interface CreateCardRequest extends Request {
  body: {
    id?: number;
    name: string;
    ownerID: number;
    type: string;
  };
}

export interface UpdateCardRequest extends CreateCardRequest {}
