import { format } from "date-fns";

export const formatToDateString = (d: Date) => format(d, "HH:mm, dd.MM.yyyy");
