export interface EmailTemplate {
  key: string;
  title: string;
  subtitle: string;
  subject: string;
  body: string;
  originalSubject?: string;
  originalBody?: string;
}
