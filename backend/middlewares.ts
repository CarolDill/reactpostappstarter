import { NextFunction , Request, Response} from "express";

// Valid body
export const validRequest = (req: Request, res: Response, next: NextFunction) => {
  const data = req.body;

  const { title, category, image } = data;
  if(title && category && image) {
      next();
  } else {
      res.status(400).json({message: "Please add all information: Title, category and image"});
  }    
}