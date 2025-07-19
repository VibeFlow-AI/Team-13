import SampleView from "@/components/sample-view";
import { createSupabaseServerClient } from "@/lib/supabase-server";

async function Home() {
  const supabase = await createSupabaseServerClient();
  const { data: samples } = await supabase.from("sample").select("*");

  return <SampleView initialSamples={samples ?? []} />;
}

export default Home;
