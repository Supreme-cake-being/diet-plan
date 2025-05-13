import { Verification } from "src/components/Verification";

interface IProps {
  params: Promise<{ verificationToken: string }>;
}

export default async function VerificationPage({ params }: IProps) {
  const resolvedParams = await params;

  return <Verification verificationToken={resolvedParams.verificationToken} />;
}
