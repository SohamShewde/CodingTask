const StoreCard = ({ store, rate }) => {
  return (
    <div className="bg-white p-5 rounded-2xl shadow border">

      <h2 className="text-xl font-bold">{store.name}</h2>

      <p className="text-gray-500">{store.address}</p>

      {/* ⭐ Average Rating */}
      <p className="mt-2 text-yellow-500 font-medium">
        ⭐ Rating: {Number(store.rating).toFixed(1)}
      </p>

      {/* 👤 User Rating */}
      <p className="text-sm text-blue-500">
        {store.myRating
          ? `Your rating: ${store.myRating}⭐`
          : "Not rated yet"}
      </p>

      {/* ⭐ Buttons */}
      <div className="flex gap-2 mt-4">
        {[1, 2, 3, 4, 5].map((r) => (
          <button
            type="button"
            key={r}
            onClick={() => rate(store.id, r)}
            className={`px-3 py-1 rounded border transition ${store.myRating === r
                ? "bg-blue-500 text-white"
                : "hover:bg-blue-500 hover:text-white"
              }`}
          >
            {r}★
          </button>
        ))}
      </div>
    </div>
  );
};

export default StoreCard;