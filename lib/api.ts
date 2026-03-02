console.log("API BASE:", process.env.NEXT_PUBLIC_API_BASE);

const API_BASE = process.env.NEXT_PUBLIC_API_BASE!;

// Map frontend vote types to Lambda enum values
const voteTypeMap: Record<string, string> = {
  youreRight: "RIGHT",
  youreWrong: "WRONG",
  depends: "DEPENDS",
};

export const getPosts = async () =>
  fetch(`${API_BASE}/getPosts`).then(res => res.json());

export const createPost = async (content: string) =>
  fetch(`${API_BASE}/createPost`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content })
  }).then(res => res.json());

export const vote = async (postId: string, voteType: string) => {
  // Convert frontend vote type to Lambda enum
  const mappedVoteType = voteTypeMap[voteType] || voteType;
  
  // Log the payload for debugging
  console.log("VOTE PAYLOAD:", { postId, voteType: mappedVoteType });

  return fetch(`${API_BASE}/vote`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ postId, voteType: mappedVoteType })
  }).then(res => res.json());
}
