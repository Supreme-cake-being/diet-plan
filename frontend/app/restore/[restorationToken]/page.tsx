import { RestorePasswordForm } from "src/components/forms/RestorePasswordForm";

interface IProps {
  params: Promise<{ restorationToken: string }>;
}

export default async function RestorePasswordPage({ params }: IProps) {
  const resolvedParams = await params;
  return (
    <RestorePasswordForm restorationToken={resolvedParams.restorationToken} />
  );
}
