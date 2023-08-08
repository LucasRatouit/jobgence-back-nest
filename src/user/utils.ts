export function usersSerializer(blackList = [], whiteList = []): string[] {
  const columns = ['id', 'name', 'created_at', 'updated_at', 'deleted_at'];

  return [
    ...columns.filter((column) => !blackList.includes(column)),
    ...whiteList,
  ];
}
