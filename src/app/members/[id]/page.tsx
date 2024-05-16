import MemberPage from "@/components/MemberPage";

export default async function page({ params }: { params: { id: string } }) {
  const memberId = params.id;
  if (!memberId) {
    // ボードIDが指定されていない場合の処理
    return <div>メンバーIDが指定されていません</div>;
  }

  try {
    const memberRes = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/members/${memberId}`);
    if (!memberRes.ok) {
      // APIのレスポンスが正常でない場合
      console.error('Failed to fetch the member');
      return <div>メンバーが見つかりません</div>;
    }
    const member: Member = await memberRes.json();
    
    return (
      <main>
        <MemberPage id={member.id} name={member.name} />
      </main>
    );
  } catch (error) {
    console.error('Error fetching member:', error);
    return <div>メンバーが見つかりません</div>;
  }
}