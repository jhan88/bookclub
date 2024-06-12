import { useMutation, useQueryClient } from '@tanstack/react-query';
import { registerBook } from '../api/firebase';

export default function useInventory() {
  const queryClient = useQueryClient();

  const register = useMutation({
    mutationFn: (book) => registerBook(book),
    onSuccess: () => queryClient.invalidateQueries(['inventory']),
  });

  return { register };
}
