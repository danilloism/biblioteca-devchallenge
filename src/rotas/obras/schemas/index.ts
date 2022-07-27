import { obraCommonProps, obraSchema } from './obra.schema';
import {
  ObraListReply,
  obraListReplySchema,
  ObraPostBody,
  obraPostBodySchema,
  ObraPutBody,
  ObraReply,
  obraReplySchema,
} from './payload.schema';
import {
  deleteObraSchema,
  getObrasSchema,
  getOneObraSchema,
  postObraSchema,
  putObraSchema,
} from './routes.schema';

export {
  deleteObraSchema,
  getObrasSchema,
  getOneObraSchema,
  obraCommonProps,
  ObraListReply,
  obraListReplySchema,
  ObraPostBody,
  obraPostBodySchema,
  ObraPutBody,
  ObraReply,
  obraReplySchema,
  obraSchema,
  postObraSchema,
  putObraSchema,
};
