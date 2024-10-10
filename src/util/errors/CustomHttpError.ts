export class CustomHttpError extends Error {
  public payload: unknown;
  public responseCode?: number;
  public statusCode: number;
  public responseText?: string;
  constructor(
    message: string,
    extras: {
      statusCode: number;
      payload?: unknown;
      responseCode?: number;
      responseText?: string;
    }
  ) {
    super(message);
    this.name = "CustomHttpError";
    this.payload = extras.payload;
    this.responseCode = extras.responseCode;
    this.statusCode = extras.statusCode;
    this.responseText = extras.responseText;
  }
}
