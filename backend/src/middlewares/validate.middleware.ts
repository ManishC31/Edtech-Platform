import { ZodObject, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";

interface ValidationSchemas {
  body?: ZodObject;
  query?: ZodObject;
  params?: ZodObject;
  headers?: ZodObject;
}

export const validate = (schemas: ValidationSchemas) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // validate each part if schema exists
      if (schemas.body) {
        const parsed = schemas.body.safeParse(req.body);
        if (!parsed.success) throw parsed.error;
        req.body = parsed.data;
      }

      if (schemas.query) {
        const parsed = schemas.query.safeParse(req.query);
        if (!parsed.success) throw parsed.error;
        req.query = parsed.data as any;
      }

      if (schemas.params) {
        const parsed = schemas.params.safeParse(req.params);
        if (!parsed.success) throw parsed.error;
        req.params = parsed.data as import("express-serve-static-core").ParamsDictionary;
      }

      if (schemas.headers) {
        const parsed = schemas.headers.safeParse(req.headers);
        if (!parsed.success) throw parsed.error;
        req.headers = parsed.data as import("http").IncomingHttpHeaders;
      }

      next();
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({ errors: err.issues });
      }
      return res.status(500).json({ message: "Validation failed", error: err });
    }
  };
};

/************ OLD CODE **********/
// import { ZodObject, ZodRawShape } from "zod";
// import { Request, Response, NextFunction } from "express";

// export const validate = (schema: ZodObject<ZodRawShape>) => (req: Request, res: Response, next: NextFunction) => {
//   const result = schema.safeParse(req.body);

//   if (!result.success) {
//     return res.status(400).json({ errors: result.error.issues });
//   }

//   req.body = result.data;
//   next();
// };
