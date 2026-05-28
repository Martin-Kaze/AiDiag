'use client'
import { useState } from "react";
import { Badge as Bg } from 'lucide-react';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import {
  Field,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import CustToggleGroup from "../../components/MutipleUse/CustToggleGroup";
import type { InfoData } from "@/types/types";

const SelectMutipleIcon = ({ val }: { val: number }) => {
  return (
    <div className="shrink-0 w-8 h-8 my-5 rounded-full bg-green-300 text-black flex items-center justify-center text-sm font-semibold">
      {val}
    </div>
  );
};

const ExplainMore = ({ data }: any) => {
  const [thecorrect, setCorrect] = useState<boolean | undefined>(undefined);
  const [thefalse, setTheFalse] = useState<boolean | undefined>(undefined);


  const result = data?.symptomarray?.[0];

  if (!result) return null;

  const q1 = result.questions1;
  const q2 = result.question2;

  const firstQuestion: InfoData[] =
    q1?.answers?.map((x: string) => ({
      Title: x,
      MoreInfo: "",
    })) || [];

  const secondQuestion: InfoData[] =
    q2?.answers?.map((x: string) => ({
      Title: x,
      MoreInfo: "",
    })) || [];

  const HandleFalseClick = () => {
    setTheFalse(true);
    setCorrect(false);
  };

  const HandleTrueClick = () => {
    setCorrect(true);
    setTheFalse(false);
  };

  return (
    <div className="flex flex-col justify-center items-center w-full">

      <Alert className="max-w-xl">
        <Bg />

        <AlertTitle className="border-b pb-1">
          {result.title}
        </AlertTitle>

        <AlertDescription className="text-black mt-2">
          {result.description}
        </AlertDescription>
      </Alert>

      {result.analysis && (
        <p className="text-sm text-neutral-500 mt-3 max-w-xl text-center">
          {result.analysis}
        </p>
      )}

      {thecorrect !== true && (
        <>
          <div className="flex flex-row gap-3 mt-5 justify-center">

            <FieldSet className="w-full max-w-xs">

              <FieldLegend variant="label" className="text-center">
                Is this analysis accurate?
              </FieldLegend>

              <RadioGroup className="flex">

                <Field orientation="horizontal" className="border-2 p-2 rounded-2xl border-green-500 bg-green-200">
                  <RadioGroupItem
                    value="true"
                    id="true-select"
                    onClick={HandleTrueClick}
                    checked={thecorrect}
                  />

                  <FieldLabel
                    htmlFor="true-select"
                    className="font-normal"
                  >
                    True
                  </FieldLabel>
                </Field>

                <Field orientation="horizontal" className="border-2 p-2 rounded-2xl border-red-500 bg-red-200">
                  <RadioGroupItem
                    value="false"
                    id="false-select"
                    onClick={HandleFalseClick}
                    checked={thefalse}
                  />

                  <FieldLabel
                    htmlFor="false-select"
                    className="font-normal"
                  >
                    False
                  </FieldLabel>
                </Field>

              </RadioGroup>
            </FieldSet>
          </div>

          <p className="mt-5 text-sm font-light text-neutral-400 text-center">
            AI-generated reflection tool. Not medical advice.
          </p>
        </>
      )}

      <Separator orientation="horizontal" className="my-4" />

      {thecorrect === true && (
        <div className="flex flex-col items-center text-center w-full">

          {q1 && (
            <>
              <SelectMutipleIcon val={1} />

              <CustToggleGroup
                data={firstQuestion}
                DescripText={q1.descript}
                LengedText={q1.title}
              />
            </>
          )}

          {q2 && (
            <>
              <SelectMutipleIcon val={2} />

              <CustToggleGroup
                data={secondQuestion}
                DescripText={q2.descript}
                LengedText={q2.title}
              />
            </>
          )}

        </div>
      )}
    </div>
  );
};

export default ExplainMore;