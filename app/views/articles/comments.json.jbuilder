json.array!(@article.comments) do |comment|
  json.extract! comment, :id, :body, :commenter, :created_at
end
