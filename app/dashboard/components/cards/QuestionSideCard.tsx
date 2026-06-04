'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { useDispatch } from "react-redux"
import { setQuestion } from "@/state/slices/UserInputSlice"
const QuestionSideCard = () => {


  const dispatch = useDispatch();

  const handleButoon = (question: string) => {
    dispatch(setQuestion(question));
  }

  return (
    <Card className=" mx-auto w-full min-w-50 pt-0">

      <CardHeader>
        <CardTitle>Quick Questions</CardTitle>
        <CardDescription>
          Allows AI anayse your subcription channels
        </CardDescription>
      </CardHeader>


      <CardContent>
        <Button onClick={() => handleButoon('Best Vibe Channel')}>
          Best Vibes Creator
        </Button>

      </CardContent>

      <CardContent>
        <Button onClick={() => handleButoon('Worst Vibe Channel')}>
          Worst Vibes Creator
        </Button>
      </CardContent>

      <CardFooter>

      </CardFooter>
    </Card>
  )
}

export default QuestionSideCard