interface AgeResponse {
  name: string;
  age: number;
  count: number;
}

interface GenderResponse {
  name: string;
  gender: string;
  probability: number;
  count: number;
}

interface CountryData {
  country_id: string;
  probability: number;
}

interface CountryResponse {
  name: string;
  country: CountryData[];
}

const getPredictionAge = async (name: string): Promise<AgeResponse> => {
  const res = await fetch(`https://api.agify.io?name=${name}`);
  return res.json();
};

const getPredictionGender = async (name: string): Promise<GenderResponse> => {
  const res = await fetch(`https://api.genderize.io?name=${name}`);
  return res.json();
};

const getPredictionCountry = async (name: string): Promise<CountryResponse> => {
  const res = await fetch(`https://api.nationalize.io?name=${name}`);
  return res.json();
};

interface PageProps {
  params: Promise<{
    name: string;
  }>;
}

export default async function page({ params }: PageProps) {
  const { name } = await params;
  const ageDate = getPredictionAge(name);
  const genderData = getPredictionGender(name);
  const countryData = getPredictionCountry(name);

  const [age, gender, country] = await Promise.all([
    ageDate,
    genderData,
    countryData,
  ]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Personal Info</h2>
        <div className="space-y-4">
          <div className="p-3 bg-gray-50 rounded">
            <p className="text-gray-600 text-sm">Name</p>
            <p className="text-xl font-semibold text-gray-900">{name}</p>
          </div>
          <div className="p-3 bg-gray-50 rounded">
            <p className="text-gray-600 text-sm">Age</p>
            <p className="text-xl font-semibold text-gray-900">{age?.age}</p>
          </div>
          <div className="p-3 bg-gray-50 rounded">
            <p className="text-gray-600 text-sm">Gender</p>
            <p className="text-xl font-semibold text-gray-900">
              {gender?.gender}
            </p>
          </div>
          <div className="p-3 bg-gray-50 rounded">
            <p className="text-gray-600 text-sm">Country</p>
            <p className="text-xl font-semibold text-gray-900">
              {country?.country?.[0]?.country_id}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
