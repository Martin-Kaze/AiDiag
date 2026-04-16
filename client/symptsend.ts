import type { UserSymptoms } from "./types/types"; 

const userSelected: UserSymptoms[] = [];

const handleSubmit = async (data: any) => {
  try {
    const response = await fetch('http://localhost:3500/api/symptoms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), 
    });

    const result = await response.json();
    console.log('Success:', result);
  } catch (error) {
    console.error('Error:', error);
  }
};

export default function AddingSymp ( symptom: string, intensity : number, duration : number, Nomore : boolean){

    if(Nomore){
    userSelected.push({ symptom, sympotmLenght: intensity, symptomSeverity: duration})
    handleSubmit(userSelected);    
    }
    else{
    userSelected.push({ symptom, sympotmLenght: intensity, symptomSeverity: duration})
    }
    
   
}

   