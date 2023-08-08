export function entrepriseSerializer(blackList = [], whiteList = []): string[] {
  const columns = [
    'id',
    'name',
    'siret',
    'localisation',
    'type',
    'created_at',
    'updated_at',
    'deleted_at',
  ];

  return [
    ...columns.filter((column) => !blackList.includes(column)),
    ...whiteList,
  ];
}
