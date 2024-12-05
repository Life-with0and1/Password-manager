import Card from "./Card";

interface Cred {
  _id: string;
  cred: string;
  type: string;
  users: string[];
  __v: number;
}

const Creds = ({
  url,
  credentils = [],
  fetchCredentials,
}: {
  url: string;
  credentils?: Cred[];
  fetchCredentials: () => void;
}) => {
  return (
    <div className="p-10 flex flex-col items-center ">
      <div className="h-[2px] w-[80%] bg-slate-400" />
      <h1 className="text-md text-white font-thin mb-3 text-center mt-1">
        Your Saved Credentils
      </h1>
      <div className="flex justify-center flex-wrap gap-5 ">
        {Array.isArray(credentils) && credentils.length > 0 ? (
          credentils.map((credential) => (
            <Card
              key={credential._id}
              url={url}
              credential={credential}
              fetchCredentials={fetchCredentials}
            />
          ))
        ) : (
          <p className="text-center text-lg font-semibold">
            Add Your First Cred.
          </p>
        )}
      </div>
    </div>
  );
};

export default Creds;
